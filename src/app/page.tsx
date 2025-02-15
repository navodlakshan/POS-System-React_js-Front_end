import {Sidebar} from "@/components/Sidebar";
import {Header} from "@/components/Header";
import {Metrics} from "@/components/Metrics";
import {SalesChart} from "@/components/SalesChart";

export default function Home() {
  return (
      <div className="flex min-h-screen">
        <Sidebar/>
        <div className="flex-1">
          <Header/>
          <Metrics/>
            <div className="p-8">
                <SalesChart/>
            </div>
        </div>
      </div>
  );
}
