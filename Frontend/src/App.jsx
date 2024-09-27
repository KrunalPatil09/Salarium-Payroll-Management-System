import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  function Handle() {
    alert("Button Clicked");
  }
  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center ">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>My Card</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={Handle}>My Button</Button>
          </CardContent>
          <CardFooter className="text-center">This is Made by ME</CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
