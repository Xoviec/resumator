/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Reducer, useEffect, useMemo, useReducer } from "react";

type Options = {
  collectionName: string;
  fetchOnMount?: boolean;
};

enum Actions {
  "SET_IS_LOADING",
  "SUCCESSFULLY_FETCHED",
  "SET_ERROR",
  "ADD_NEW_DATA",
  "UPDATE_DATA_BY_ID",
  "DELETE_BY_ID",
  "DELETE_BY_IDS",
}

type State = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Array<{ id?: string }>;
  isLoading: boolean;
  isError: boolean;
};

const initialState: State = {
  data: [],
  isLoading: false,
  isError: false,
};

type Action<T> = {
  type: Actions;
  payload?: T;
};

type Error = {
  isError: boolean;
  errorMessage: string;
};

interface SUCCESSFULLY_FETCHED_ACTION extends Action<any> {
  type: Actions.SUCCESSFULLY_FETCHED;
}

interface SET_IS_LOADING_ACTION extends Action<boolean> {
  type: Actions.SET_IS_LOADING;
}

interface SET_ERROR_ACTION extends Action<Error> {
  type: Actions.SET_ERROR;
}

interface ADD_NEW_DATA_ACTION extends Action<any> {
  type: Actions.ADD_NEW_DATA;
}

interface UPDATE_DATA_BY_ID_ACTION extends Action<any> {
  type: Actions.UPDATE_DATA_BY_ID;
}

interface DELETE_BY_ID_ACTION extends Action<string> {
  type: Actions.DELETE_BY_ID;
}

interface DELETE_BY_IDS_ACTION extends Action<string[]> {
  type: Actions.DELETE_BY_IDS;
}

type ActionTypes =
  | SUCCESSFULLY_FETCHED_ACTION
  | SET_IS_LOADING_ACTION
  | ADD_NEW_DATA_ACTION
  | SET_ERROR_ACTION
  | DELETE_BY_ID_ACTION
  | DELETE_BY_IDS_ACTION
  | UPDATE_DATA_BY_ID_ACTION;

const reducer: Reducer<typeof initialState, ActionTypes> = (
  state,
  action
): State => {
  switch (action.type) {
    case Actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload || true,
      };
    case Actions.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case Actions.SUCCESSFULLY_FETCHED:
      /* eslint-disable no-case-declarations */
      const data = action.payload?.docs?.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return {
            ...doc.data(),
          };
        }
      );
      return {
        ...state,
        isLoading: false,
        data,
      };
    case Actions.ADD_NEW_DATA:
      return {
        ...state,
        isLoading: false,
        data: state.data.concat(action.payload),
      };
    case Actions.UPDATE_DATA_BY_ID:
      const selectedIndex = state.data.findIndex(
        (x) => x?.id === action.payload?.id
      );
      return {
        ...state,
        isLoading: false,
        data: [
          ...state.data.slice(0, selectedIndex),
          { ...state.data[selectedIndex], ...action.payload.updatedFields },
          ...state.data.slice(selectedIndex + 1),
        ],
      };
    case Actions.DELETE_BY_ID:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((x) => x.id !== action.payload),
      };
    case Actions.DELETE_BY_IDS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((x) => !action.payload?.includes(x.id ?? "")),
      };
    default:
      return state;
  }
};

export const useFetchData = <T = []>({ collectionName }: Options) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const collection = useMemo(() => {
    return firebase.firestore().collection(collectionName);
  }, [collectionName]);

  const setError = (errorText = "Something went wrong") => {
    dispatch({
      type: Actions.SET_ERROR,
      payload: {
        isError: true,
        errorMessage: errorText,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: Actions.SET_IS_LOADING });
        const response = await collection.get();
        dispatch({
          type: Actions.SUCCESSFULLY_FETCHED,
          payload: response,
        });
      } catch {
        setError("Something went wrong fetching data");
      }
    };
    fetchData();
  }, [collection]);

  const addToCollection = async (data: any) => {
    try {
      dispatch({ type: Actions.SET_IS_LOADING });
      const collectionRef = collection.doc();
      const newData = { ...data, id: collectionRef.id };
      await collectionRef.set(newData);

      dispatch({
        type: Actions.ADD_NEW_DATA,
        payload: newData,
      });
    } catch (e) {
      setError();
    }
  };

  const updateFieldsById = async (
    documentId: string,
    updatedFields: Record<string, any>
  ) => {
    dispatch({ type: Actions.SET_IS_LOADING });
    const docRef = collection.doc(documentId);
    await docRef.update(updatedFields);
    dispatch({
      type: Actions.UPDATE_DATA_BY_ID,
      payload: { id: documentId, updatedFields },
    });
  };

  const deleteById = async (documentId: string) => {
    try {
      dispatch({ type: Actions.SET_IS_LOADING });
      const docRef = collection.doc(documentId);
      await docRef.delete();
      dispatch({ type: Actions.DELETE_BY_ID, payload: documentId });
    } catch (e) {
      setError("Something went wrong deleting");
    }
  };

  const deleteByIds = async (documentIds: string[]) => {
    try {
      dispatch({ type: Actions.SET_IS_LOADING });
      const batch = firebase.firestore().batch();
      documentIds.forEach(async (documentId) => {
        const docRef = collection.doc(documentId);
        batch.delete(docRef);
      });
      await batch.commit();
      dispatch({ type: Actions.DELETE_BY_IDS, payload: documentIds });
    } catch (e) {
      setError("Something went wrong deleting");
    }
  };

  return {
    ...state,
    data: state.data as unknown as T,
    addToCollection,
    updateFieldsById,
    deleteById,
    deleteByIds,
  };
};
