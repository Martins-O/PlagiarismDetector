const PlagiarismController = require('./controller/PlagiarismController');

// Example usage
async function main() {
    const controller = new PlagiarismController();

    try {
        const textToCheck = "Your text to check for plagiarism";
        const report = await controller.detectPlagiarism(textToCheck);

        console.log('Plagiarism Detection Report:');
        console.log('Total matches found:', report.totalMatches);

        report.matches.forEach((match, index) => {
            console.log(`\nMatch ${index + 1}:`);
            console.log('Source:', match.title);
            console.log('URL:', match.url);
            console.log('Similarity:', `${match.similarity}%`);
            console.log('Matched text:', match.matchedText);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

if (require.main === module) {
    main().catch();
}