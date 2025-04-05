import Link from "next/link";
import {Users, Box, ClipboardList, Grid, Gift, DollarSign} from "lucide-react";

export default function Card({
                                 title,
                                 description,
                                 icon,
                                 href,
                             }: {
    title: string;
    description: string;
    icon: "Users" | "Box" | "ClipboardList" | "Grid" | "Gift" | "DollarSign"; // Restrict the icon type to match the keys in the `icons` object
    href: string;
}) {
    const icons = {
        Users: <Users className="w-6 h-6 text-blue-600" />,
        Box: <Box className="w-6 h-6 text-blue-600" />,
        Grid: <Grid className="w-6 h-6 text-blue-600" />,
        ClipboardList: <ClipboardList className="w-6 h-6 text-blue-600" />,
        Gift: <Gift className="w-6 h-6 text-blue-600" />,
        DollarSign: <DollarSign className="w-6 h-6 text-blue-600" />
    };

    return (
        <Link
            href={href}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition flex items-center gap-4"
        >
            {icons[icon]} {/* Now TypeScript knows `icon` matches keys in `icons` */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </Link>
    );
}
