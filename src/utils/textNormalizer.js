class TextNormalizer {
    static normalize(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
}

module.exports = TextNormalizer;