import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Header = async () => {
  const user = await checkUser();

  return (
    <Card className="rounded-none shadow-sm">
      <CardContent className="p-4">
        <nav className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <h2 className="text-2xl font-bold">Habit Tracker</h2>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
};

export default Header;

