import { connectToDB } from "@/lib/mongoose";

interface Props{
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async({
    currentUserId,
    accountId,
    accountType
}: Props)=>{



    return (
        <section>
            Threadstab
        </section>
    )
}

export default ThreadsTab;
