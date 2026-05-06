import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    """
    Take the path of a docx file and return a single string for the whole document.

    References:
    https://stackoverflow.com/questions/57490076/how-to-extract-text-from-docx-without-using-python-docx
    """
    try:
        with zipfile.ZipFile(path, 'r') as z:
            # Document text is in word/document.xml
            xml_content = z.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        
        # Docx XML uses namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        # Iterate through all paragraph elements and join text
        paragraphs = []
        for p in tree.findall('.//w:p', ns):
            texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
            if texts:
                paragraphs.append("".join(texts))
        
        return "\n".join(paragraphs)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    import sys
    # Use the specific path found
    path = r"C:\Users\Asus\Downloads\Telegram Desktop\Платформа.docx"
    text = get_docx_text(path)
    with open("platforma_text.txt", "w", encoding="utf-8") as f:
        f.write(text)

    print("Text extracted to platforma_text.txt")

