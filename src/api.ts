import { Observable, catchError, concatMap, of } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface ApiResponse<TData> {
  success: boolean;
  code: number | null;
  message: string;
  data: TData | null;
}

export function apiCall(id: number): Observable<ApiResponse<Post>> {
  return fromFetch(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
    concatMap((response: Response) => {
      const apiRes: ApiResponse<Post> = {
        success: true,
        code: response.status,
        message: response.statusText,
        data: null
      };

      if (!response.ok) {
        apiRes.success = false;
        return of(apiRes);
      }
      return response.json().then(function (jsonData) {
        apiRes.data = jsonData as Post;
        return apiRes;
      });
    }),

    catchError((err) => {
      return of({
        success: false,
        code: null,
        message: err,
        data: null
      });
    })
  );
}
