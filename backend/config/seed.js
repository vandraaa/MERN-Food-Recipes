import adminSeed from "../utils/seeds/adminSeed.js";

const runSeeds = async () => {
    try {
        await adminSeed();

        console.log('All seeds have been successfully executed')
    } catch (e) {
        console.error(`Error running seeds: ${e.message}`);
    }
}

export default runSeeds