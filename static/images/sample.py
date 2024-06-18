from PIL import Image
import os

def resize_image(input_path, output_path, width=None, height=None):
    """
    Resize an image to the given width and height while maintaining the aspect ratio.

    :param input_path: Path to the input image file
    :param output_path: Path to save the resized image file
    :param width: Desired width of the resized image (optional)
    :param height: Desired height of the resized image (optional)
    """
    with Image.open(input_path) as img:
        original_width, original_height = img.size
        print(f"Original size: {original_width}x{original_height}")

        # Calculate the new size maintaining the aspect ratio
        if width and height:
            new_size = (width, height)
        elif width:
            aspect_ratio = original_height / original_width
            new_size = (width, int(width * aspect_ratio))
        elif height:
            aspect_ratio = original_width / original_height
            new_size = (int(height * aspect_ratio), height)
        else:
            # If no width or height is specified, keep the original size
            new_size = (original_width, original_height)
        
        print(f"Resizing to: {new_size[0]}x{new_size[1]}")

        # Resize the image
        resized_img = img.resize(new_size)
        resized_img.save(output_path)
        print(f"Resized image saved to: {output_path}")

# Example usage
names = ["fluid", 'thermo', "main-qimg-f4e2fe14e1085c7a3d16cf4e7ea05baf-pjlq"]
ret = ['a.jpg', 'b.jpg', "c.jpg"]
input_image_path = lambda x: f'static/images/{names[x]}.jpg'
output_image_path = 'ant.jpg'

for i in range(len(names)):
    resize_image(input_image_path(i), ret[i], width=200, height=300)
