import psycopg2
import json

def get_connection():
    return psycopg2.connect(
        host="aws-0-eu-west-2.pooler.supabase.com",
        port=6543,
        user="postgres.jwdbxlvalwaoxmnpqwza",
        password="AmrAtefportfolio",
        dbname="postgres",
        sslmode="require"
    )

def setup_database():
    conn = get_connection()
    cur = conn.cursor()

    print("Checking current tables...")
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = [row[0] for row in cur.fetchall()]
    print("Existing tables in public schema:", tables)

    # 1. Create portfolio_profile table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_profile (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main_profile',
        name VARCHAR(100) NOT NULL,
        name_ar VARCHAR(100) NOT NULL,
        title VARCHAR(150) NOT NULL,
        title_ar VARCHAR(150) NOT NULL,
        bio TEXT NOT NULL,
        bio_ar TEXT NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        location_ar VARCHAR(100) NOT NULL,
        github VARCHAR(255),
        linkedin VARCHAR(255),
        whatsapp VARCHAR(255),
        resume_url VARCHAR(255),
        admin_pin VARCHAR(20) DEFAULT '1234',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # 2. Create portfolio_messages table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_messages (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # 3. Create portfolio_projects table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_projects (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        title_ar VARCHAR(150) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        tagline_ar VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        featured BOOLEAN DEFAULT TRUE,
        badge VARCHAR(100) NOT NULL,
        architecture JSONB NOT NULL,
        technologies JSONB NOT NULL,
        metrics JSONB NOT NULL,
        features JSONB NOT NULL,
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # Insert or update Amr Atef's profile
    cur.execute("""
    INSERT INTO public.portfolio_profile (
        id, name, name_ar, title, title_ar, bio, bio_ar, 
        email, phone, location, location_ar, github, linkedin, whatsapp, resume_url, admin_pin
    ) VALUES (
        'main_profile',
        'Amr Atef',
        'عمرو عاطف',
        'Senior .NET & Backend Architect',
        'مهندس نظم خلفية ومعماري .NET 10',
        'Passionate Senior Backend Engineer specialized in high-performance enterprise systems, Clean Architecture, and Domain-Driven Design (DDD). Extensive experience in .NET 10, CQRS, Multi-Tenancy, PostgreSQL, and distributed caching.',
        'مهندس برمجيات متقدم متخصص في بناء وتصميم الأنظمة الخلفية عالية الأداء والمعمارية النظيفة (Clean Architecture & DDD). خبرة عميقة في .NET 10، أنماط CQRS، تعدد المستأجرين (Multi-Tenancy)، وقواعد بيانات PostgreSQL، والكاش الموزع.',
        'amratef.dev@gmail.com',
        '+20 100 000 0000',
        'Cairo, Egypt',
        'القاهرة، مصر',
        'https://github.com/amratef',
        'https://linkedin.com/in/amratef',
        'https://wa.me/201000000000',
        '/Amr_Atef_Resume.pdf',
        '1234'
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        name_ar = EXCLUDED.name_ar,
        title = EXCLUDED.title,
        title_ar = EXCLUDED.title_ar,
        bio = EXCLUDED.bio,
        bio_ar = EXCLUDED.bio_ar,
        updated_at = NOW();
    """)

    conn.commit()
    print("Database tables created and profile populated successfully!")
    
    # Check tables again
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    print("Updated public tables:", [row[0] for row in cur.fetchall()])

    # Check anon key / jwt secret if available in auth/vault
    cur.close()
    conn.close()

if __name__ == '__main__':
    setup_database()
