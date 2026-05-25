@echo off & python -x "%~f0" %* & goto :eof
import sys, zipfile, re
from pathlib import Path

folder = Path(__file__).parent

# --- 1. Fix template.docx: remove floating table (w:tblpPr) ---
tdocx = folder / "template.docx"
try:
    with zipfile.ZipFile(tdocx, 'r') as zin:
        names = zin.namelist()
        contents = {n: zin.read(n) for n in names}
    xml = contents['word/document.xml'].decode('utf-8')
    xml_new = re.sub(r'<w:tblpPr[^/]*/>', '', xml)
    if xml_new != xml:
        contents['word/document.xml'] = xml_new.encode('utf-8')
        tmp = tdocx.with_suffix('.tmp.docx')
        with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
            for n in names:
                zout.writestr(n, contents[n])
        tmp.replace(tdocx)
        print("template.docx: OK (floating table removed)")
    else:
        print("template.docx: already fixed, skipping")
except Exception as e:
    print(f"template.docx ERROR: {e}")

# --- 2. Fix generate.py: remove comma after g. ---
gpy = folder / "generate.py"
try:
    text = gpy.read_text(encoding='utf-8')
    # г = г, к = к
    text_new = text.replace('г., к ', 'г. к ')
    if text_new != text:
        gpy.write_text(text_new, encoding='utf-8')
        print("generate.py: OK (comma removed)")
    else:
        print("generate.py: comma already correct, skipping")
except Exception as e:
    print(f"generate.py ERROR: {e}")

print()
print("All done! You can now run run.bat as usual.")
input("Press Enter to exit...")
