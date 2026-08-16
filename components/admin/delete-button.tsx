'use client';

import { Button } from '@/components/ui/button';

export function DeleteButton({
  action,
  confirmMessage = 'Delete this item? This can\'t be undone.',
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      action={action}
    >
      <Button variant="destructive" size="sm" type="submit">
        Delete
      </Button>
    </form>
  );
}
