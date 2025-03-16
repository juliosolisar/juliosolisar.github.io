module Jekyll
  module HideCustomBibtex
    def hideCustomBibtex(input)
      # first remove any fields listed in _config.yml under 'filtered_bibtex_keywords'
      keywords = @context.registers[:site].config['filtered_bibtex_keywords']
      keywords.each do |keyword|
        input = input.gsub(/^.*\b#{keyword}\b *= *\{.*$\n/, '')
      end

      # remove lines with the sortyear field
      input = input.gsub(/^.*\bsortyear\b *= *\{.*$\n/, '')

      # Clean superscripts in author lists
      input = input.gsub(/^.*\bauthor\b *= *\{.*$\n/) do |line|
        line.gsub(/[*†‡§¶‖&^]/, '')
      end

      return input
    end
  end
end

Liquid::Template.register_filter(Jekyll::HideCustomBibtex)
