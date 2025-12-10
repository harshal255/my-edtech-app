import { getResources } from "@/actions/resource";
import { AddResourceModal } from "@/components/AddResourceModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { EditResourceModal } from "@/components/EditResourceModal";
import { DeleteResourceBtn } from "@/components/DeleteResourceBtn";

export default async function DashboardPage() {
    const resources = await getResources();

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">DevResource Hub</h1>
                        <p className="text-muted-foreground mt-1">
                            Discover and share the best developer tools.
                        </p>
                    </div>
                    <AddResourceModal />
                </div>

                {/* Resources Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {resources.map((res) => (
                        <Card key={res._id} className="hover:shadow-lg transition-shadow relative group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium pr-8">
                                    {res.title}
                                </CardTitle>
                                <Badge variant="secondary">{res.category}</Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                                    {res.description}
                                </p>

                                <div className="flex justify-between items-center mt-4">
                                    <a
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        Visit Link <ExternalLink size={14} />
                                    </a>

                                    {/* Actions: Edit & Delete */}
                                    <div className="flex gap-1">
                                        <EditResourceModal resource={res} />
                                        <DeleteResourceBtn id={res._id} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {resources.length === 0 && (
                        <div className="col-span-2 text-center py-12 text-gray-500">
                            No resources found. Be the first to add one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}