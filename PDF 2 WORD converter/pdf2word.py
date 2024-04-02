from pdf2docx import Converter

old_pdf = "logbook.pdf"
new_doc = "logbook.docx"

obj = Converter(old_pdf)
obj.convert(new_doc)
obj.close()