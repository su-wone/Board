const todoIssues = [
    { id: "BOARD-1", title: "로그인 페이지 만들기", priority: "High" },
    { id: "BOARD-2", title: "회원가입 API 연동", priority: "Medium" },
    { id: "BOARD-3", title: "랜딩 페이지 문구 수정", priority: "Low" },
    { id: "BOARD-4", title: "랜딩 페이지 문구 수정", priority: "Low" },

];

const InProgress = [
    { id: "BOARD-1", title: "로그인 페이지 만들기", priority: "High" },
    { id: "BOARD-2", title: "회원가입 API 연동", priority: "Medium" }

];


const priorityStyles: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-200 text-gray-700",
};

export default function DashboardPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="flex gap-4">
                <div className="flex-1 rounded-lg bg-gray-100 p-4">
                    <h2 className="font-semibold mb-3">To Do</h2>

                    {todoIssues.map((issue) => (
                        <div key={issue.id} className="rounded-md bg-white p-3 shadow-sm mb-2">
                            <p className="text-xs text-gray-500">{issue.id}</p>
                            <p className="text-sm font-medium mt-1">{issue.title}</p>
                            <div className="mt-3">
                                <span
                                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[issue.priority]}`}
                                >
                                    {issue.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-1 rounded-lg bg-gray-100 p-4">
                    <h2 className="font-semibold mb-3">In Progress</h2>
                    {InProgress.map((issue) => (
                        <div key={issue.id} className="rounded-md bg-white p-3 shadow-sm mb-2">
                            <p className="text-xs text-gray-500">{issue.id}</p>
                            <p className="text-sm font-medium mt-1">{issue.title}</p>
                            <div className="mt-3">
                                <span
                                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[issue.priority]}`}
                                >
                                    {issue.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-1 rounded-lg bg-gray-100 p-4">
                    <h2 className="font-semibold mb-3">Done</h2>
                </div>
            </div>
        </main>
    );
}
