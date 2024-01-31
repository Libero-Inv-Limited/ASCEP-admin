import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { CreateCategorySchema } from "@/schemas/responseSchemas";

export const useGetAllCategories = () => {
  return useQuery(
    ["all-categories"],

    (): Promise<CollectionData[]> => {
      return axios.get(`${baseUrl}/category/all`).then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

interface CategoryPayload extends CreateCategorySchema {
  type: "any";
}

export const useAddNewCategory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: CategoryPayload) => {
      return axios
        .post(`${baseUrl}/category/make`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-categories");
        toast({
          title: "Success!",
          variant: "success",
          description: `Category Created`,
          duration: 2000,
        });
      },
    }
  );
};

export const useDeleteCategory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => {
      return axios
        .delete(`${baseUrl}/category/delete/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-categories");
        toast({
          title: "Success!",
          variant: "success",
          description: `Category Deleted`,
          duration: 2000,
        });
      },
    }
  );
};

export const useGetCategoryModerators = (id: string) => {
  return useQuery(
    ["category-moderators", id],

    (): Promise<CategoryModeratorType[]> => {
      return axios
        .get(`${baseUrl}/category/all-moderator/${id}`)
        .then((res) => res.data.data.records);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useAddCategoryModerator = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (values: { user: number; category: string }) => {
      return axios
        .post(`${baseUrl}/category/add-moderator`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("category-moderators");
        toast({
          title: "Success!",
          variant: "success",
          description: `Moderator Added`,
          duration: 2000,
        });
      },
    }
  );
};

export const useDeleteCategoryModerator = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    ({ user, category }: { user: number; category: number }) => {
      return axios
        .delete(`${baseUrl}/category/remove-moderatorx/${user}/${category}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("category-moderators");
        toast({
          title: "Success!",
          variant: "success",
          description: `Moderator Deleted`,
          duration: 2000,
        });
      },
    }
  );
};
