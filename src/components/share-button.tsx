import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { Store } from "@/store/app.store";
import { CheckIcon, CopyIcon, ShareIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export function ShareItemButton({
  item,
  className,
}: {
  item: Store["items"][number];
  className?: string;
}) {
  const [copying, setCopying] = useState(false);
  const { copy, supported: copySupported } = useCopyToClipboard();
  const url = new URL(window.location.href);
  url.searchParams.set("item", JSON.stringify(item));
  const shareUrl = url.toString();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" className={className}>
          <ShareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поделиться</DialogTitle>
          <QRCodeSVG value={shareUrl} className="aspect-sqare w-full h-auto" />
          {copySupported && (
            <>
              <span className="text-center w-full my-2">или</span>
              <div className="w-full flex gap-2">
                <Input defaultValue={shareUrl} disabled />
                <Button
                  size="icon"
                  onClick={() =>
                    copy(shareUrl).then(() => {
                      setCopying(true);
                      setTimeout(() => setCopying(false), 1500);
                    })
                  }
                  disabled={copying}
                >
                  {!copying ? <CopyIcon /> : <CheckIcon />}
                </Button>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
