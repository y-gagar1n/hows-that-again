import os

files = [os.path.splitext(file) for file in os.listdir('./')]
mdfiles = [file for file in files if file[1]=='.md']

for file in mdfiles:
    f = open(file[0] + file[1], 'r+')
    content = f.read()
    first_line = content[2:content.find('\n')]
    f.seek(0, 0)
    f.write('---\n')
    f.write('title: "%s"\n' % first_line)
    f.write('path: "/blog/%s"\n' % file[0])
    f.write('---\n')
    f.write(content)
    f.close
