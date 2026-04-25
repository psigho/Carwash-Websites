import csv
import json
import os
import shutil
import subprocess
import re
from pathlib import Path

# Paths
BASE_DIR = Path(r"e:\Website Building")
LEADS_CSV = BASE_DIR / "leads" / "austin_auto_detailers_full.csv"
OUTPUT_CSV = BASE_DIR / "leads" / "outreach_ready_leads.csv"
TEMPLATE_DIR = BASE_DIR / "Money_Template"
OUTPUT_DIR = BASE_DIR / "Outreach_Sites"

def clean_dir_name(name):
    """Sanitize business name for directory creation."""
    return re.sub(r'[^a-zA-Z0-9]', '_', name).strip('_').lower()

def deploy_to_vercel(site_dir):
    """Deploy the directory to Vercel and return the live URL."""
    print(f"Deploying {site_dir.name} to Vercel...")
    try:
        # Run vercel --prod --yes
        # Note: Requires Vercel CLI to be logged in globally
        result = subprocess.run(
            ['vercel', '--prod', '--yes'],
            cwd=str(site_dir),
            capture_output=True,
            text=True,
            shell=True # Required on Windows for some global npm packages
        )
        
        # Vercel outputs the production URL on stdout
        output = result.stdout.strip()
        error_output = result.stderr.strip()
        
        # Find the URL in the output (usually the last line or containing vercel.app)
        urls = re.findall(r'https://[a-zA-Z0-9-\.]+\.vercel\.app', output + error_output)
        if urls:
            live_url = urls[-1] # the last one is typically the final prod URL
            print(f"Success! Live URL: {live_url}")
            return live_url
        else:
            print(f"Failed to find URL in deployment output:\n{error_output}")
            return None
    except Exception as e:
        print(f"Deployment error: {e}")
        return None

def process_lead(row):
    """Clone template and update config for a single lead."""
    business_name = row.get('Business Name', '').strip()
    if not business_name:
        return None
        
    print(f"\nProcessing target: {business_name}")
    dir_name = clean_dir_name(business_name)
    target_dir = OUTPUT_DIR / dir_name
    
    # 1. Clone Template
    if target_dir.exists():
        print(f"Directory {target_dir} already exists. Removing...")
        shutil.rmtree(target_dir)
        
    shutil.copytree(TEMPLATE_DIR, target_dir)
    print(f"Template cloned to {target_dir.name}")
    
    # 2. Update Config
    config_path = target_dir / "website_config.json"
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
        
    # Update Core Branding
    config['branding']['name'] = business_name
    
    # Calculate initials for logo text. Simple logic: first letters of up to first 3 words.
    words = business_name.split()
    initials = "".join([w[0].upper() for w in words[:3] if w])
    config['branding']['logo_text'] = initials
    
    config['meta']['title'] = f"Best Auto Detailing in Austin | {business_name}"
    
    # Update Contact Info
    phone = row.get('Phone', '').strip()
    if phone:
        config['contact']['phone'] = phone
        config['hero']['cta_secondary_link'] = f"tel:{re.sub(r'[^0-9]', '', phone)}"
        
    email = row.get('Email', '').strip()
    if email:
        config['contact']['email'] = email
        
    address = row.get('Address', '').strip()
    if address:
        config['contact']['address'] = address
        
    # Trust Signals
    rating = row.get('Rating', '').strip()
    config['trust_signals'] = {
        "rating": rating if rating else "5.0",
        "review_count": "50+", # Default generic positive
        "display_text": f"Rated {rating if rating else '5.0'} by Local Customers"
    }
    
    # Write updated config
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4)
        
    print(f"Config updated for {business_name}")
    
    # 3. Deploy
    live_url = deploy_to_vercel(target_dir)
    
    # Return updated row
    row['Generated_Website_URL'] = live_url
    return row

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    if not LEADS_CSV.exists():
        print(f"Error: Could not find leads file at {LEADS_CSV}")
        return
        
    processed_rows = []
    fieldnames = []
    
    try:
        with open(LEADS_CSV, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            fieldnames = reader.fieldnames
            if 'Generated_Website_URL' not in fieldnames:
                fieldnames.append('Generated_Website_URL')
                
            # For testing, let's only take the top 2 leads to verify end-to-end
            # In production, we'd loop through all or a batch
            count = 0
            for row in reader:
                if count >= 2:
                    break
                updated_row = process_lead(row)
                if updated_row:
                    processed_rows.append(updated_row)
                    count += 1
            
        print("\nSaving results...")
        with open(OUTPUT_CSV, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(processed_rows)
            
        print(f"\nCompleted processing. Output saved to {OUTPUT_CSV}")
        
    except Exception as e:
        print(f"Error in main loop: {e}")

if __name__ == "__main__":
    main()
