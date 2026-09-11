import fs from "fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const SOURCE_SERVICE_ACCOUNT =
    "C:\\Users\\Lcyry\\Downloads\\tindahan-ai-f0a89.json";

const TARGET_SERVICE_ACCOUNT =
    "C:\\Users\\Lcyry\\Downloads\\tindahan-ai-de1b0.json";

const sourceCredentials = JSON.parse(
    fs.readFileSync(SOURCE_SERVICE_ACCOUNT, "utf8")
);

const targetCredentials = JSON.parse(
    fs.readFileSync(TARGET_SERVICE_ACCOUNT, "utf8")
);

const sourceApp = initializeApp(
    {
        credential: cert(sourceCredentials),
    },
    "source"
);

const targetApp = initializeApp(
    {
        credential: cert(targetCredentials),
    },
    "target"
);

const sourceDb = getFirestore(sourceApp);
const targetDb = getFirestore(targetApp);

const collections = ["products", "sales"];

async function migrateCollection(collectionName) {
    console.log(`\nMigrating "${collectionName}"...`);

    const snapshot = await sourceDb
        .collection(collectionName)
        .get();

    console.log(`Found ${snapshot.size} documents.`);

    let batch = targetDb.batch();
    let batchCount = 0;
    let totalMigrated = 0;

    for (const document of snapshot.docs) {
        const targetRef = targetDb
            .collection(collectionName)
            .doc(document.id);

        batch.set(targetRef, document.data());

        batchCount++;
        totalMigrated++;

        if (batchCount === 500) {
            await batch.commit();

            console.log(
                `Migrated ${totalMigrated}/${snapshot.size} documents.`
            );

            batch = targetDb.batch();
            batchCount = 0;
        }
    }

    if (batchCount > 0) {
        await batch.commit();
    }

    console.log(
        `Finished "${collectionName}": ${totalMigrated} documents migrated.`
    );
}

async function migrate() {
    console.log("Starting Firestore migration...");
    console.log("Source:", sourceCredentials.project_id);
    console.log("Target:", targetCredentials.project_id);

    for (const collection of collections) {
        await migrateCollection(collection);
    }

    console.log("\nMigration completed successfully.");
}

migrate().catch((error) => {
    console.error("\nMigration failed:");
    console.error(error);
    process.exit(1);
});