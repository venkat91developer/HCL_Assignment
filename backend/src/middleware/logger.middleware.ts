import * as fs from "fs";
import * as path from "path";

export const requestLogger = () => {
    const currentDate = new Date();
    const folderName = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
    const fileName = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}.log`;

    const folderPath = path.join(__dirname, "logs", folderName);
    const filePath = path.join(folderPath, fileName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, `Log created at ${new Date().toISOString()}\n`);
    // console.log(`File created: ${filePath}`);
};
