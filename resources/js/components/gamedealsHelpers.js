import { useToast } from "@chakra-ui/react";

//Speific helpers for anything related to stores.
// Will have functions like below, as quick access to store related UI features without clogging the rest of the files.
export const useGamedealsHelpers = () => {
  const toast = useToast();

  const successToast = (title, message) => {
    toast({
      title: `${title}`,
      description: `${message}`,
      position: "bottom-right",
      status: "success",
      duration: 3500,
      isClosable: true,
    });
  };

  const errorToast = (errorObject = null) => {
    toast({
      title: "An error has occured",
      description: `${
        errorObject?.message ||
        errorObject?.response?.data?.message ||
        errorObject
      }`,
      position: "bottom-right",
      status: "error",
      duration: 3500,
      isClosable: true,
    });
  };

  // const getStoreLabel = (store) => {
  //     return;
  // }

  return { successToast, errorToast };
};
