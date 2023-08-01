"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import jsonToDartClass, { Data } from "@/utils/json_convertor/json_convertor";
import { useEffect, useState } from "react";

enum SwitchId {
  fromJsonMethodId,
  toJsonMethodId,
  copyWithMethodId,
  toStringMethodId,
  equatableMethodId,
}

export default function Home() {
  const [data, setData] = useState<Data>({
    className: undefined,
    json: "",
    result: "",
    copyWith: true,
    toJson: true,
    fromJson: true,
    toString: true,
    equatable: true,
  });

  useEffect(() => {
    handleConvertClick(data.json);
  }, [data]);

  function handleConvertClick(text: string) {
    if (isValidJson(text)) {
      setData((prevValue) => ({
        ...prevValue,
        result: jsonToDartClass(data),
      }));
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
        <Input
          placeholder="Class name (Optional)"
          onChange={(event) => {
            setData((prevData) => ({
              ...prevData,
              className: event.target.value,
            }));
          }}
        />
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
      <div className="w-[40%] bg-green-300">
        {/* Text Area */}
        <Textarea
          className="h-[80%]"
          onChange={(event) => {
            setData((prevData) => ({
              ...prevData,
              json: event.target.value,
            }));
          }}
        />

        <Button
          onClick={() => {
            handleConvertClick(data.json);
          }}
        >
          Convert
        </Button>
      </div>
      <div className="w-[40%] bg-blue-300 whitespace-pre-wrap">
        {/* Display Area */}
        <Textarea className="h-screen" readOnly defaultValue={data.result} />
        {/* {data.result} */}
      </div>
    </div>
  );
}
