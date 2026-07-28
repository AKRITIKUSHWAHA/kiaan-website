

import { internshipProgramsData } from './src/data/InternshipProgramData';

console.log('Validating data...');
const requiredFields = [
    'hero', 'curriculum', 'liveProjects', 'prerequisites',
    'outcomes', 'tools', 'certification', 'isPaid', 'stipendInfo'
];

let errors = 0;
for (const [key, program] of Object.entries(internshipProgramsData)) {
    // Check top level fields
    for (const field of requiredFields) {
        if ((program as any)[field] === undefined) {
            console.error(`Error: Program '${key}' is missing field '${field}'`);
            errors++;
        }
    }

    // Check nested fields
    if (program.hero) {
        if (!program.hero.highlights) {
            console.error(`Error: Program '${key}' is missing field 'hero.highlights'`);
            errors++;
        }
    }
}

if (errors === 0) {
    console.log('All programs valid!');
} else {
    console.log(`Found ${errors} errors.`);
}
