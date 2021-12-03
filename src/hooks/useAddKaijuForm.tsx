import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../Api/HttpService";
import { ApplicationState } from "../redux";
import { setKaijuDNAValue, setKaijuDNAError } from "../redux/kaijuDNA";
import { validateKaijuDNA } from "../utils";

export const useAddKaijuForm = () => {
  const dispatch = useDispatch();
  const { dna, hasError } = useSelector(
    (state: ApplicationState) => state.kaijuDNA
  );

  useEffect(() => {
    const isValid = validateKaijuDNA(dna);
    dispatch(setKaijuDNAError(!isValid));
  }, [dna, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setKaijuDNAValue(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      const res = await HttpService.post({
        dna
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSubmit,
    handleChange,
    dna,
    hasError
  };
};
