const supabaseUrl = 'https://wdirokabfwlavgbnaqob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkaXJva2FiZndsYXZnYm5hcW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2ODYzMjIsImV4cCI6MjA0NTI2MjMyMn0.69kgm9wE8yeU5uof6h-MXOxae5q2d85IOazUs0yVs9k';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export { supabase };
