import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Pythonスクリプトを実行
  exec('python3 path_to_your_script.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ error: 'Failed to execute Python script' });
    }
    
    // スクリプトの標準出力（stdout）をレスポンスとして返す
    res.status(200).json({ message: stdout });
  });
}
