import re
import os

def extract_sql_from_markdown(markdown_text):
    sql_pattern = r'```sql\n(.*?)\n```'
    sql_queries = re.findall(sql_pattern, markdown_text, re.DOTALL)
    
    return sql_queries

if __name__ == "__main__":
    markdown_file_path = 'README.md'
    output_sql_file_path = 'dummy.sql'

    if os.path.exists(markdown_file_path):
        with open(markdown_file_path, 'r', encoding='utf-8') as file:
            markdown_content = file.read()
        
        sql_queries = extract_sql_from_markdown(markdown_content)
        
        if sql_queries:
            with open(output_sql_file_path, 'w', encoding='utf-8') as sql_file:
                for query in sql_queries:
                    sql_file.write(query.strip() + '\n\n')
            print(f"Extracted SQL queries to {output_sql_file_path}.")
        else:
            print("No SQL queries found in the markdown file.")
    else:
        print(f"Markdown file {markdown_file_path} does not exist.")
