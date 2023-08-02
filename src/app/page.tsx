"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import jsonToDartClass, {
  CurrentData,
  Data,
  convertToListData,
} from "@/utils/json_convertor/json_convertor";
import { useEffect, useState } from "react";

enum SwitchId {
  fromJsonMethodId,
  toJsonMethodId,
  copyWithMethodId,
  toStringMethodId,
  equatableMethodId,
}

export default function Home() {
  const emptyData = {
    className: undefined,
    copyWith: true,
    toJson: true,
    fromJson: true,
    toString: true,
    equatable: true,
  };
  const [data, setData] = useState<Data>(emptyData);

  const [result, setResult] = useState<string>("");

  const [currentData, setCurrentData] = useState<CurrentData>({
    currentIndex: -1,
    listOfJson: [],
    listOfKeys: [],
  });

  const [text, setText] = useState<string>("");

  // useEffect(() => {
  //   handleConvert();
  // }, [currentData]);

  function handleConvert(currentIndex?: number) {
    if (isValidJson(text)) {
      const tempData = convertToListData(text, currentIndex);
      setCurrentData(tempData);
      setResult(
        jsonToDartClass(
          {
            ...data,
            className: tempData.listOfKeys[tempData.currentIndex].replace(
              ".dart",
              ""
            ),
          },
          tempData.listOfJson[tempData.currentIndex]
        )
      );
    }
  }

  function isValidJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  return (
    <div className="flex flex-row h-screen">
      <div className="w-[20%]">
        {/* Control Panel */}
        {/* <Input
          placeholder="Class name (Optional)"
          onChange={(event) => {
            setData((prevData) => ({
              ...prevData,
              className: event.target.value,
            }));
          }}
        /> */}
        <div className="flex items-center space-x-2 mt-4">
          {/* <Switch
            id={SwitchId.toJsonMethodId.toString()}
            defaultChecked={true}
            onCheckedChange={(checked) => {
              setData((prevData) => ({
                ...prevData,
                copyWith: checked,
              }));
            }}
          />
          <Label htmlFor={SwitchId.toJsonMethodId.toString()}>
            toJson Method
          </Label>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            defaultChecked={true}
            id={SwitchId.fromJsonMethodId.toString()}
            onCheckedChange={(checked) => {
              setData((prevData) => ({
                ...prevData,
                toJson: checked,
              }));
            }}
          /> */}
          {/* <Label htmlFor={SwitchId.fromJsonMethodId.toString()}>
            fromJson Method
          </Label> */}
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            defaultChecked={true}
            id={SwitchId.copyWithMethodId.toString()}
            onCheckedChange={(checked) => {
              setData((prevData) => ({
                ...prevData,
                fromJson: checked,
              }));
            }}
          />
          <Label htmlFor={SwitchId.copyWithMethodId.toString()}>
            copyWith Method
          </Label>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            defaultChecked={true}
            id={SwitchId.toStringMethodId.toString()}
            onCheckedChange={(checked) => {
              setData((prevData) => ({
                ...prevData,
                toString: checked,
              }));
            }}
          />
          <Label htmlFor={SwitchId.toStringMethodId.toString()}>
            toString Method
          </Label>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            defaultChecked={true}
            id={SwitchId.equatableMethodId.toString()}
            onCheckedChange={(checked) => {
              setData((prevData) => ({
                ...prevData,
                equatable: checked,
              }));
            }}
          />
          <Label htmlFor={SwitchId.equatableMethodId.toString()}>
            equatable Method
          </Label>
        </div>
      </div>
      <div className="w-[40%]">
        {/* Text Area */}
        <Textarea
          className="h-[80%]"
          onChange={(event) => {
            setText(event.target.value);
          }}
        />

        <Button
          onClick={() => {
            setCurrentData((prevData) => ({
              ...prevData,
              currentIndex: 0,
            }));
            handleConvert();
          }}
        >
          Convert
        </Button>
      </div>
      <div className="w-[40%] bg-blue-200 whitespace-pre-wrap">
        {/* Display Area */}
        <Textarea className="h-[70%]" readOnly defaultValue={result} />
        <Button
          className="my-2"
          onClick={() => {
            navigator.clipboard.writeText(result);
          }}
        >
          Copy
        </Button>
        <div className="flex flex-wrap  items-start">
          {currentData.listOfJson &&
            currentData.listOfKeys.map((key, index) => (
              <Badge
                className="cursor-pointer mx-2 my-2"
                onClick={() => {
                  setCurrentData((prevData) => ({
                    ...prevData,
                    currentIndex: index,
                  }));
                  handleConvert(index);
                }}
                key={`${key}-${index}`}
              >
                {key}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
