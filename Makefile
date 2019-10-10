SOURCE_DOCS := $(wildcard *.md)

EXPORTED_DOCS=$(SOURCE_DOCS:.md=.html)

PANDOC=/usr/local/bin/pandoc

PANDOC_OPTIONS=--smart --standalone --css style.css
PANDOC_HTML_OPTIONS=--to html5

%.html: %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $<

.PHONY: all

all: $(EXPORTED_DOCS)

