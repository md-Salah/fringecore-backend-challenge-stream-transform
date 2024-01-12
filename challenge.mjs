// ALL YOUR CODE SHOULD BE HERE
// DO NOT EDIT THE OTHER FILES
import net from "node:net";

const server = net.createServer();
const origin = net.createConnection({ port: 3032 });

const needleRaw = "i like big trains and i cant lie";



function findLongestCommonSubstring(str1, str2) { 
    let longestSubstring = ""; 
  
    for (let i = 0; i < str1.length; i++) { 
        for (let j = 0; j < str2.length; j++) { 
            let substring = ""; 
            let x = i; 
            let y = j; 
  
            while (x < str1.length &&  
                   y < str2.length &&  
                   str1[x] === str2[y]) { 
                substring += str1[x]; 
                x++; 
                y++; 
            } 
  
            if (substring.length > longestSubstring.length) { 
                longestSubstring = substring; 
            } 
        } 
    } 
  
    return longestSubstring; 
} 

server.on("connection", (conn) => {
    origin.write('a');

    origin.on('data', (data) => {
        const decoded = data.toString('utf-8');
        let substring = findLongestCommonSubstring(decoded, needleRaw);

        const encrypted = decoded.replace(substring, '-'.repeat(substring.length));
        conn.write(encrypted);
    });

    conn.on("close", () => console.log("closed"));

    conn.on("error", (error) => {
        console.error(error);
    });
});


const port = parseInt(process.env.PORT ?? "3031");

server.listen(port, () => {
    console.log(`STARTED SERVER 0.0.0.0:${port}`);
});
