/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from "react";
import { useForm, Controller, SubmitHandler, FieldName } from "react-hook-form";
import { Game } from "../../context/GameContext";
import { RegionContext } from "../../context/RegionContext";
import Select from "../Select/Select";

interface GameServerFormProps {
    onSubmit?: (data: any) => void;
    selectedGame: Game;
    onChange?: (data: any) => void;
}

const FieldMap = {
    server_ip: "Server IP",
    server_port: "Server Join PORT",
    server_query_port: "Server Query Port",
    title: "Title or Name of server",
    description: "Description of server",
    url: "Website URL or IP Address"
}

const GameServerForm: React.FC<GameServerFormProps> = ({ onSubmit, selectedGame, onChange }) => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm();

    const { regions } = useContext(RegionContext);
    const watchedFields = watch();

    const handleFormSubmit: SubmitHandler<any> = (data) => {
        if (onSubmit) {
            onSubmit(data);
        } else {
            console.log("Form Data:", data);
        }
    };
    useEffect(() => {
        if (onChange) {
            onChange(watchedFields);
        }
    }, [JSON.stringify(watchedFields)])

    return (
        <div className="p-6 border border-gray-300 rounded-md shadow-md mt-8">
            <h2 className="text-lg font-bold mb-4 text-white">Server details for <strong>{selectedGame.name}</strong></h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {Object.entries(selectedGame.metaData).map(([fieldName, value]) => (
                    <div key={fieldName} className="flex flex-col space-y-2">
                        <Controller
                            name={fieldName}
                            control={control}
                            defaultValue={value !== "required" ? value : ""}
                            render={({ field }) => (
                                <div className="flex flex-col">
                                    <label className="text-gray-300 font-medium mb-1">
                                        {fieldName.replace(/_/g, " ").toUpperCase()}
                                    </label>
                                    <input
                                        {...field}
                                        type="text"
                                        required={true}
                                        placeholder={FieldMap[fieldName as keyof typeof FieldMap]}
                                        className={`w-full p-2 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors[fieldName] && (
                                        <span className="text-red-500 text-sm mt-1">{`${fieldName} is required`}</span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                ))}

                <div className="flex flex-col space-y-2">
                    <Controller
                        name="region"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please select a region' }}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <Select
                                    {...field}
                                    options={regions.map((region) => ({ label: region.name, value: region._id }))}
                                    label="Select Region"
                                    required={true}
                                    darkMode={true}
                                />
                                {errors.region && (
                                    <span className="text-red-500 text-sm mt-1">{errors.region.message}</span>
                                )}
                            </div>
                        )}
                    />
                </div>
                {onSubmit && (
                    <button type="submit" className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Submit
                    </button>
                )}
            </form>

        </div>
    );
};

export default GameServerForm;
