import * as Client from "@storacha/client";
import { filesFromPaths } from "files-from-path";
import fs from "fs";

const client = await Client.create();

console.log("📧 Logging in to Storacha...");
const account = await client.login("umarsanda3323@gmail.com");

console.log("✅ Logged in successfully!");

// 🕓 Wait for plan activation (important for first-time users)
await account.plan.wait();

// 🪐 Create and set a space for uploads
console.log("🪐 Creating a new space...");
const space = await client.createSpace("umar-space", { account });
await client.setCurrentSpace(space.did());

const testDir = "./test-files";
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
fs.writeFileSync(`${testDir}/hello.txt`, "Hello Storacha from Umar! 🚀");

console.log("📦 Uploading directory...");
const files = await filesFromPaths([testDir]);
const cid = await client.uploadDirectory(files);

const gatewayUrl = `https://${cid}.ipfs.storacha.link`;
console.log("✅ Upload complete!");
console.log("CID:", cid);
console.log("Gateway URL:", gatewayUrl);
