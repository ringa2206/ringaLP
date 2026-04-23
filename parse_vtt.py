import sys
import re

def vtt_to_text(vtt_file, out_file):
    with open(vtt_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    text_lines = []
    for line in lines:
        line = line.strip()
        if not line or '-->' in line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:') or re.match(r'^\d{2}:\d{2}', line) or line.startswith('align:'):
            continue
        # Remove tags like <c.colorE5E5E5> or tags completely like <00:00:15.845><c> etc.
        clean_line = re.sub(r'<[^>]+>', '', line)
        if clean_line and (len(text_lines) == 0 or text_lines[-1] != clean_line):
            text_lines.append(clean_line)
            
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(text_lines))

vtt_to_text('Ringaの現来マインドセットで自由自在な人生へ！ [rojQqpWeE0g].ja.vtt', 'transcript.txt')
