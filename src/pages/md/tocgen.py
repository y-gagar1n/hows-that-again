import os

files = [os.path.splitext(file) for file in os.listdir('./')]
mdfiles = [file for file in files if file[1]=='.md']

f = open('toc.txt', 'w')
for file in mdfiles:
    f.write('<div><Link to="/blog/%s">%s</Link></div>\n' % (file[0], file[0]))
f.close()
