import Card from "@/components/admin/ui/Card";

export default function AdminDashboard() {
    return (
        <div className="grid gap-6">
            {/* Dashboard Heading */}
            <h1 className="text-4xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Users" description="Manage all registered users" icon="Users" href="/admin/users" />
                <Card title="Products" description="Add, edit, or delete products" icon="Box" href="/admin/products" />
                <Card title="Categories" description="Organize product categories" icon="Grid" href="/admin/categories" />
                <Card title="Orders" description="Track and update orders" icon="ClipboardList" href="/admin/orders" />
                <Card title="Referrals" description="Monitor user referral activity" icon="Gift" href="/admin/referrals" />
                <Card title="Commissions" description="View and manage commission payouts" icon="DollarSign" href="/admin/commissions" />
            </div>
        </div>
    );
}
