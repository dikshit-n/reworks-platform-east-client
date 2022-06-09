import { createApiFunction } from "@/utils";
import axios from "axios";

class ViewDataApi {
  viewData(): Promise<{ title: string }[]> {
    return createApiFunction(() =>
      axios.get("https://jsonplaceholder.typicode.com/todos")
    );
  }
}

export const viewDataApi = new ViewDataApi();
