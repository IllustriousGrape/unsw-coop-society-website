import { createClient } from "@/lib/supabase/server";
import { markMessageRead } from "@/app/admin/actions";
import { formatShortDate } from "@/utils/format";
import type { ContactMessage } from "@/types/database";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (messages ?? []) as ContactMessage[];

  return (
    <div>
      <h1 className="text-charcoal text-3xl font-bold">Contact Messages</h1>
      <p className="text-text-muted mt-2">
        Messages submitted through the public contact form.
      </p>

      {list.length === 0 ? (
        <p className="text-text-muted mt-8">No messages yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {list.map((message) => (
            <li
              key={message.id}
              className={`rounded-2xl border p-6 ${
                message.is_read
                  ? "border-border bg-surface"
                  : "border-charcoal bg-surface"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-charcoal font-semibold">
                    {message.subject}
                  </p>
                  <p className="text-text-muted mt-1 text-sm">
                    From {message.name} ·{" "}
                    <a
                      href={`mailto:${message.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {message.email}
                    </a>{" "}
                    · {formatShortDate(message.created_at)}
                  </p>
                </div>
                {!message.is_read ? (
                  <form action={markMessageRead.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="border-border text-charcoal hover:border-charcoal rounded-full border px-4 py-1.5 text-sm font-medium"
                    >
                      Mark as read
                    </button>
                  </form>
                ) : null}
              </div>
              <p className="text-text-muted mt-4 text-sm leading-relaxed whitespace-pre-line">
                {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
