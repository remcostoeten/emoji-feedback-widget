"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CookieIcon, SettingsIcon, TrashIcon, XIcon } from "../Icons";
import useLocalStorage from "@/core/hooks/useLocalStorage";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import { toast } from "sonner";

export default function ActionsMenu() {
  const { t } = useTranslation(); // Initialize the t function
  const [, setStoredValue] = useLocalStorage(
    "feedbackHidden",
    "feedbackHidden",
  );

  const handleClearStorage = () => {
    setStoredValue("");
    window.localStorage.clear();
    toast(t("cacheCleared"));
    window.location.reload();
  };

  const handleClearCache = () => {
    // Add your clear cache logic here
    alert(t("clearCache"));
  };

  const handleManageCookies = () => {
    alert(t("manageCookies"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5 text-card-light" />
          <span className="sr-only">{t("actions.utillities")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuItem>
          <Button variant="actions" onClick={handleClearStorage}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrashIcon className="h-4 w-4" />
                <span>{t("clearLocalStorage")}</span>
              </div>
            </div>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Button variant="actions" onClick={handleClearCache}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrashIcon className="h-4 w-4" />
                <span>{t("clearCache")}</span>
              </div>
            </div>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Button variant="actions" onClick={handleManageCookies}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CookieIcon className="h-4 w-4" />
                <span>{t("manageCookies")}</span>
              </div>
            </div>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
