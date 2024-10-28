class PlagiarismReport {
    constructor(originalText, matches) {
        this.originalText = originalText;
        this.matches = matches;
        this.totalMatches = matches.length;
        this.timestamp = new Date();
    }

    toJSON() {
        return {
            originalText: this.originalText,
            totalMatches: this.totalMatches,
            matches: this.matches,
            timestamp: this.timestamp
        };
    }
}

module.exports = PlagiarismReport;