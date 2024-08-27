import tensorflow as tf
import numpy as np
from PIL import Image
import os

def load_vgg_model():
    vgg = tf.keras.applications.VGG19(include_top=False, weights='imagenet')
    vgg.trainable = False
    return vgg

def load_and_process_image(image_path):
    max_dim = 512
    img = Image.open(image_path)
    long = max(img.size)
    scale = max_dim / long
    img = img.resize((round(img.size[0] * scale), round(img.size[1] * scale)))
    img = np.array(img)

    img = tf.keras.applications.vgg19.preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img

def deprocess_image(img):
    x = img.copy()
    if len(x.shape) == 4:
        x = np.squeeze(x, 0)
    assert len(x.shape) == 3

    x[:, :, 0] += 103.939
    x[:, :, 1] += 116.779
    x[:, :, 2] += 123.68
    x = x[:, :, ::-1]

    x = np.clip(x, 0, 255).astype('uint8')
    return x

def compute_content_loss(base_content, target):
    return tf.reduce_mean(tf.square(base_content - target))

def gram_matrix(input_tensor):
    channels = int(input_tensor.shape[-1])
    a = tf.reshape(input_tensor, [-1, channels])
    n = tf.shape(a)[0]
    gram = tf.matmul(a, a, transpose_a=True)
    return gram / tf.cast(n, tf.float32)

def compute_style_loss(base_style, gram_target):
    height, width, channels = base_style.get_shape().as_list()
    gram_style = gram_matrix(base_style)
    return tf.reduce_mean(tf.square(gram_style - gram_target))

def neural_style_transfer(content_image_path, style_image_path, output_image_path, iterations=1000, content_weight=1e3, style_weight=1e-2):
    content_image = load_and_process_image(content_image_path)
    style_image = load_and_process_image(style_image_path)

    vgg = load_vgg_model()
    style_layers = ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1', 'block5_conv1']
    content_layers = ['block5_conv2']

    style_outputs = [vgg.get_layer(name).output for name in style_layers]
    content_outputs = [vgg.get_layer(name).output for name in content_layers]
    model_outputs = style_outputs + content_outputs

    model = tf.keras.models.Model(vgg.input, model_outputs)

    def compute_loss(model, loss_weights, init_image, gram_style_features, content_features):
        style_weight, content_weight = loss_weights

        model_outputs = model(init_image)
        style_output_features = model_outputs[:len(style_layers)]
        content_output_features = model_outputs[len(style_layers):]

        style_score = 0
        content_score = 0

        weight_per_style_layer = 1.0 / float(len(style_layers))
        for target_style, comb_style in zip(gram_style_features, style_output_features):
            style_score += weight_per_style_layer * compute_style_loss(comb_style[0], target_style)

        weight_per_content_layer = 1.0 / float(len(content_layers))
        for target_content, comb_content in zip(content_features, content_output_features):
            content_score += weight_per_content_layer * compute_content_loss(comb_content[0], target_content)

        style_score *= style_weight
        content_score *= content_weight

        loss = style_score + content_score
        return loss, style_score, content_score

    def compute_grads(cfg):
        with tf.GradientTape() as tape:
            all_loss = compute_loss(**cfg)
        total_loss = all_loss[0]
        return tape.gradient(total_loss, cfg['init_image']), all_loss

    num_style_layers = len(style_layers)
    num_content_layers = len(content_layers)

    style_features = [model(style_image)[i] for i in range(num_style_layers)]
    content_features = [model(content_image)[i + num_style_layers] for i in range(num_content_layers)]
    gram_style_features = [gram_matrix(style_feature) for style_feature in style_features]

    init_image = tf.Variable(content_image, dtype=tf.float32)
    opt = tf.optimizers.Adam(learning_rate=5, beta_1=0.99, epsilon=1e-1)

    best_loss, best_img = float('inf'), None

    loss_weights = (style_weight, content_weight)
    cfg = {
        'model': model,
        'loss_weights': loss_weights,
        'init_image': init_image,
        'gram_style_features': gram_style_features,
        'content_features': content_features
    }

    for i in range(iterations):
        grads, all_loss = compute_grads(cfg)
        loss, style_score, content_score = all_loss
        opt.apply_gradients([(grads, init_image)])
        clipped = tf.clip_by_value(init_image, -1.0, 1.0)
        init_image.assign(clipped)

        if loss < best_loss:
            best_loss = loss
            best_img = deprocess_image(init_image.numpy())

        if i % 100 == 0:
            print(f'Iteration: {i}, Loss: {loss}, Style Loss: {style_score}, Content Loss: {content_score}')

    best_img = Image.fromarray(best_img)
    best_img.save(output_image_path)
    print(f'Style transfer completed, image saved to {output_image_path}')

def perform_nst(content_image_path, style_image_path, output_image_path):
    neural_style_transfer(content_image_path, style_image_path, output_image_path)

if __name__ == '__main__':
    content_image_path = 'path_to_content_image.jpg'
    style_image_path = 'path_to_style_image.jpg'
    output_image_path = 'path_to_output_image.jpg'

    perform_nst(content_image_path, style_image_path, output_image_path)
