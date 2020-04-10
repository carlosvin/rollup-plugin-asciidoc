FILES=*.md
for f in $FILES
do
  filename="${f%.*}"
  echo "Converting $f to $filename.adoc"
  `pandoc $f -f markdown -t asciidoctor -o $filename.adoc`
done

