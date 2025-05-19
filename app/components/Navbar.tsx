import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="flex float-right gap-2">
          {session && session?.user ? (
            <>
              <NavigationMenuItem>
                <Link href={`/user/${session?.user?.id}`} className="py-2">
                  <NavigationMenuLink>{session?.user?.name}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <form
                  action={async () => {
                    "use server";

                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button>Logout</Button>
                </form>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem>
              <form
                action={async () => {
                  "use server";

                  await signIn("github");
                }}
              >
                <Button>Login with GitHub</Button>
              </form>
            </NavigationMenuItem>
          )}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
