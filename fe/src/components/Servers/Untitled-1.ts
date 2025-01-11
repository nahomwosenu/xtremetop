// Context for managing narrative data
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import ControlledSelect from "@eagle-ui/shared/dist/components/ControlledSelect";
import ControlledLoveSelect from "@eagle-ui/shared/dist/components/ControlledLoveSelect";
import LabelledInput from "@eagle-ui/shared/dist/components/LabelledInput";
import HiddenRhField from "@eagle-ui/shared/dist/components/HiddenRhField";
import LovService from "@eagle-ui/shared/dist/services/LovService";
import UnixDateInput from "@ercapps-ui/shared";
import useAuth from "@ercapps-ui/auth";
import { Col } from "react-bootstrap";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { RegisterNavPoint } from "../../../util/useFormNavigation";
import { getSubstringWithThreeDots } from "../../../util/LabelMapperFns";
import FieldArraySubForm from "@eagle-ui/shared/dist/components/FieldArraySubForm";
import getCurrentSubjectFormValidationErrors from "@eagle-ui/shared/dist/getCurrentSubjectFormValidationErrors";
import useBookingSelector from "@eagle-ui/shared/dist/useBookingSelector";
import useCurrentSubjectId from "@eagle-ui/shared/dist/useCurrentSubjectId";
import getCurrentSubjectBookingValidationErrors from "@eagle-ui/shared/dist/getCurrentSubjectBookingValidationErrors";
import useSubjectAction from "@eagle-ui/subject-list";
import { Button } from "react-bootstrap";
import { FormContainer } from "../../../../forms/FormContainer";
import isEmpty from "lodash/isEmpty";
import EROCheckbox from "@eagle-ui/shared/dist/components/EROCheckbox";
import betterAgencyTypes from "@eagle-ui/shared/dist/betterAgencyTypes.js";
import { LeadTypeAgencies } from "./../../../../AgencyTypeAgencies";
import { Form } from "react-bootstrap/Form";
import { Row, Container } from "react-bootstrap";
const ero = ERO;



interface NarrativeContextType {
    narratives: any[];
    getNarrativeById: (id: string) => any | undefined;
    getFilteredNarratives: (name: string, index: number, gi66All: any) => any[];

}

const NarrativeContext = createContext<NarrativeContextType | null>(null);

export const NarrativeProvider: React.FC = ({ children }) => {
    const { watch } = useFormContext();
    const narratives: any = useWatch({ name: "booking.narratives" });

    const getNarrativeById = (id: string) => narratives?.find((n: any) => n.nrrid === id);


    const getFilteredNarratives = (name: string, index: number, gi66All: any) => {
        return narratives?.filter((narr: any) => !gi66All?.some((g: any, i: number) => i !== index && g.narrative?.description === narr.description && !g.deletedInd));

    };

    const contextValue = useMemo(() => ({
        narratives,
        getNarrativeById,
        getFilteredNarratives

    }), [narratives]);


    return (
        <NarrativeContext.Provider value= { contextValue } >
        { children }
        </NarrativeContext.Provider>
    );
};



export const useNarrativeContext = () => {
    const context = useContext(NarrativeContext);
    if (!context) {
        throw new Error("useNarrativeContext must be used within a NarrativeProvider");
    }
    return context;
};




// Helper function to set narrative details
const setNarrativeDetails = (setValue: any, name: string, index: number, narrative: any, createdBy?: string) => {
    setValue(`${name}[${index}].narrative`, narrative);
    setValue(`${name}[${index}].narrativeId`, narrative?.nrrid || "");
    setValue(`${name}[${index}].selectedNarrative`, narrative?.text || "");
    setValue(`${name}[${index}].createdBy`, createdBy || "");
    setValue(`${name}[${index}].narrativeCreatedOn`, narrative?.createdOn || "");
};

// Helper function to set employee title
const setEmployeeTitle = (setValue: any, name: string, index: number, employee: any, fieldPrefix: string) => {
    setValue(`${name}[${index}].${fieldPrefix}Title`, employee?.title || ""); // Directly use employee title
};

// Helper function for filtering agency types (adjust as needed)
const filterAgencyTypesByT = () => {
    // Your filtering logic here
    return []; // Return filtered agency types
};


// ... (other imports)


interface GI66FormProps {
    registerNav: RegisterNavPoint;
    namespace: string;
    name: string;
    index: number; // Change type to number
    showNarrativeField: boolean;
    showNonNarrativeFields: boolean;
}

const GI66Form: React.FC<GI66FormProps> = ({
    registerNav,
    namespace,
    name,
    index,
    showNarrativeField,
    showNonNarrativeFields,
}) => {
    const { control, register, setValue, getValues, watch } = useFormContext();
    const { user } = useAuth();
    const { getOneLov } = useLovService();
    const [agencyTypeLov, setAgencyTypeLov] = useState([]);
    const gi66All = getValues()?.[name];
    const { getNarrativeById, getFilteredNarratives } = useNarrativeContext();


    const gi66a: any = useWatch({ name: `${name}[0]` });
    const selectedNarrative = useWatch({
        name: `${name}[${index}].selectedNarrative`,
    });


    useEffect(() => {
        const initialNarrativeId = gi66a?.narrativeId;
        if (initialNarrativeId) {
            const narrative = getNarrativeById(initialNarrativeId);
            if (narrative) {
                setNarrativeDetails(setValue, name, index, narrative);

                // ... (rest of the effect code)
            }
        }




        if (gi66a?.approvedAgentTitle && index) {
            setEmployeeTitle(setValue, name, index, gi66a.approvedAgent, "approvedAgent");


        }
    }, [gi66a?.narrativeId, gi66a?.approvedAgentTitle, index]);






    useEffect(() => {

        setValue(`${name}[${index}].controlOffice`, user?.attributes?.officialDutyLocation?.substring(0, 3));
        setValue(`${name}[${index}].currentDutyLocation`, user?.attributes?.currentDutyLocation?.substring(0, 3));


    }, []);


    useEffect(() => {
        const fetchAgencyTypes = async () => {
            const agencyTypes = await getOneLov("agency-type");
            setAgencyTypeLov(agencyTypes?.data);
        };

        fetchAgencyTypes();
    }, []);



    useEffect(() => {

        if (gi66a?.specialAgent) {
            const agencyFromLov: any = agencyTypeLov.find((agency: any) => agency.agtId === gi66a.specialAgent?.gtfldfAgtId);
            setValue(`${name}[${index}].specialAgentOtherOffice`, agencyFromLov?.agtAgcyCd);

        }



        if (gi66a?.approvedAgent) {
            const agencyFromLov: any = agencyTypeLov.find((agency: any) => agency.agtId === gi66a.approvedAgent?.gtfldfAgtId);
            setValue(`${name}[${index}].approvedAgentOtherOffice`, agencyFromLov?.agtAgcyCd);

        }
    }, [agencyTypeLov, gi66a?.specialAgent, gi66a?.approvedAgent]);


    const specialAgentChangeHandler = (e: any) => {
        const agencyFromLov = agencyTypeLov.find((agency: any) => agency.agtId === e.gtfldfAgtId);
        setValue(`${name}[${index}].specialAgentOtherOffice`, agencyFromLov?.agtAgcyCd);
    };


    const approvedAgentChangeHandler = (e: any) => {
        setEmployeeTitle(setValue, name, index, e, "approvedAgent");

    };







    // ... (rest of the component code)



    return (
        <Col>

        <HiddenRhField fieldName= {`${name}[${index}].offDocId`
} />

{
    showNarrativeField && (
        <>
        <ControlledSelect
                        name={ `${name}[${index}].narrative` }
    labelText = "..."
    control = { control }
    options = { getFilteredNarratives(name, index, gi66All) } // Use filtered narratives
    // ... other props
    onChange = {(e: any) => {

        setNarrativeDetails(setValue, name, index, e);

    }
}
                    />



    < HiddenRhField fieldName = {`${name}[${index}].controlOffice`} />
        < HiddenRhField fieldName = {`${name}[${index}].createdBy`} defaultValue = "" />
            <HiddenRhField fieldName={ `${name}[${index}].currentDutyLocation` } />
                < HiddenRhField fieldName = {`${name}[${index}].specialAgentOtherOffice`} />
                    < HiddenRhField fieldName = {`${name}[${index}].approvedAgentOtherOffice`} />
{/* ... other hidden fields */ }

{
    selectedNarrative && (
        <div style={ { marginBottom: "10px", marginTop: "-10px" } }>
            { getSubstringWithThreeDots(selectedNarrative, 90) }
            </div>
                    )
}
</>
            )}

{/* ... (rest of the JSX) */ }

</Col >
    );
};





// ... (other components)


interface GI66Props {
    registerNav: RegisterNavPoint;
    name: string;
    labelText: string;
    showNarrativeField: boolean;
    showNonNarrativeFields: boolean;
}


const GI66: React.FC<GI66Props> = ({
    registerNav,
    name,
    labelText,
    showNarrativeField,
    showNonNarrativeFields,


}) => {


    // ... other hooks


    const gi66Narr = narratives?.filter((v: any) => v?.type?.nttcd === name.toUpperCase());
    const gi66NarrId = narratives?.find((narrative: any) => narrative.nrrid === undefined)?.nrrid;


    const buildGi66NarrativeObj = () => {

        const gi66NarrArr = gi66Narr?.map((item: any, index: any) => ({
            description: `${item.title} - ${index + 1}`,
            value: item.nrrid,
            text: item.text,
        })) || [];



        setGi66Narratives(gi66NarrArr);


    };



    useEffect(() => {
        buildGi66NarrativeObj();
    }, [gi66NarrId, narratives]); // Add narratives to dependency array


    const checkGi66NarrativesByName = () => {
        const hasUnsavedNarratives = narratives?.some((v: any) => v?.type?.nttcd.toLowerCase() === "gi66c" && v.nrrid === undefined);
        return gi66Narratives.length > 0 || hasUnsavedNarratives;
    };


    // ... other component logic




    return (
        <NarrativeProvider>{/* Wrap with NarrativeProvider */ }
        < FormContainer name = { name } registerNav = { registerNav } labelText = { labelText } >

            {/* ... other JSX ... */ }

            < FieldArraySubForm
    name = { name }


        // ... other props


        >

        {((item: any, name: any, index: any) => (
            <GI66Form


                            // ... other props


                            index= { index }


            // ... other props
            />
                    ))
}


</FieldArraySubForm>

{/* ... other JSX ... */ }

</FormContainer>
    </NarrativeProvider>
    );

};






// ... other code


const GI66A: React.FC<GI66AProps> = ({ registerNav, name, labelText }) => {



    return (

        <NarrativeProvider>{/* Wrap with NarrativeProvider */ }
        < FormContainer name = { name } registerNav = { registerNav } labelText = { labelText } >


            <FieldArraySubForm
                    name={ name }
                    // other props

                >
        {((item: any, name: any, index: any) => (
            <GI66AForm
                            // other props

                            index= { index }


            />
                    ))
}
</FieldArraySubForm>

    </FormContainer>
    </NarrativeProvider>

    );
};



const GI66AForm = ({ name, registerNav, index }: GI66AFormProps) => {


    const { control, register, setValue, getValues } = useFormContext();

    const { getNarrativeById } = useNarrativeContext();




    useEffect(() => {
        const narrativeId = gi66a?.narrativeId;
        if (narrativeId) {
            const narrSelected = getNarrativeById(narrativeId);

            if (narrSelected) {
                setNarrativeDetails(setValue, name, index, narrSelected);
            }

        }

        if (gi66a?.reviewOfficerTitle) {

            setEmployeeTitle(setValue, name, index, gi66a.reviewOfficer, "reviewOfficer");

        }


        if (gi66a?.approveOfficerTitle) {

            setEmployeeTitle(setValue, name, index, gi66a.approveOfficer, "approveOfficer");
        }




    }, [gi66a?.narrativeId, gi66a?.reviewOfficerTitle, gi66a?.approveOfficerTitle]);


    const narrativeFilterFn = () => {

        return getFilteredNarratives(name, index, gi66aAll);
    };


    return (


        // ... JSX ...


    );
};