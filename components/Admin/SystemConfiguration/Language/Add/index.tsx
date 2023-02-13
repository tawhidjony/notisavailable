import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useCreateLanguageMutation } from "Api/SystemConfiguration/Language"
import { useGetModulesQuery } from "Api/SystemConfiguration/Module"
import { useGetSubModulesQuery } from "Api/SystemConfiguration/SubModule"
import AlertDialog from "components/common/DeleteModal"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter, FormLayoutHeader } from "components/layouts/FormLayout"
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { listArrayModify } from "Utils/Handler"
import { fieldTypes } from "Utils/Language/FieldTypes"
import { TypeOf } from "yup"
import { createValidation } from "../Validation"



type ILanguageCreate = TypeOf<typeof createValidation>;
const CreateLanguage = () => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  const defaultValues: ILanguageCreate = {
    field_trans_en: "",
    field_trans_bn: "",
    moduleId: { label: "", value: "" },
    submoduleId: { label: "", value: "" },
    subchildmoduleId: { label: "", value: "" },
    title: "",
    field_type: { label: "", value: "" },
  };


  const methods = useForm<ILanguageCreate>({
    mode: "all", reValidateMode: 'onSubmit',
    resolver: yupResolver(createValidation), defaultValues
  });

  const { watch, setValue, reset, register } = methods;

  const { data: moduleList } = useGetModulesQuery("")
  const { data: subModules } = useGetSubModulesQuery("")

  const [subModuleList, setSubModuleList] = useState([])
  const [subChildModuleList, setSubChildModuleList] = useState([])
  const [addLanguage] = useCreateLanguageMutation();
  const onSubmitHandler: SubmitHandler<ILanguageCreate> = async (data: ILanguageCreate) => {
    // Key generation from module, submodule and title
    let key;
    let subModuleInfo, subChildModuleInfo;
    const moduleInfo = moduleList?.data?.data?.find((module: any) => module.id === data?.moduleId?.value);
    key = moduleInfo?.code + ".";

    if (data?.submoduleId?.value) {
      subModuleInfo = subModules?.data?.data?.find((subModule: any) => subModule.id === data?.submoduleId?.value);
      key += subModuleInfo?.code + ".";
    }

    if (data?.subchildmoduleId?.value) {
      subChildModuleInfo = subModules?.data?.data?.find((subChildModule: any) => subChildModule.id === data?.subchildmoduleId?.value);
      key += subChildModuleInfo?.code + ".";
      data.submoduleId.value = data?.subchildmoduleId?.value;
    }

    key += data?.field_type?.value?.toUpperCase() + ".";
    key += data?.title?.toUpperCase().trim().replace(/\s/g, '');

    const modifiedData = {
      field_trans_en: data?.field_trans_en,
      field_trans_bn: data?.field_trans_bn,
      title: data?.title,
      key: key.replace(/\n/g, ''),
      moduleId: data?.moduleId?.value,
      submoduleId: data?.submoduleId?.value,
      field_type: data?.field_type?.value
    }



    // delete modifiedData.subchildmoduleId;
    try {
      addLanguage(modifiedData).unwrap().then((res: any) => {
        if (res?.response?.statusCode === 201) {
          setAlertDialogOpen(true)
          methods.reset();
        }
      }).catch((err) => err?.errors?.forEach((value: any) => methods.setError(value?.field, { type: "required", message: value?.message })))
    } catch (error) {

    }
  }

  const breadcrumbLink: any = [
    { href: '#', label: 'System Configuration' },
    { href: '/admin/system_configuration/language', label: 'Add Language' }
  ]

  useEffect(() => {
    setValue("submoduleId", { label: "", value: "" });
    const moduleId = methods.watch("moduleId");
    const checkedModule = subModules?.data?.data?.filter((subModule: any) => subModule.moduleId == moduleId?.value && subModule.parentId === null);
    setSubModuleList(checkedModule);
  }, [watch("moduleId")]);

  useEffect(() => {
    setValue("subchildmoduleId", { label: "", value: "" });
    const submoduleId = methods.watch("submoduleId");
    if (!submoduleId) {
      setSubChildModuleList([]);
    } else {
      const checkedSubModule = subModules?.data?.data?.filter((subModule: any) => subModule.parentId?.id == submoduleId?.value);
      setSubChildModuleList(checkedSubModule);
    }
  }, [watch("submoduleId")]);

  const onActionNotification = () => { methods.reset(); setAlertDialogOpen(false) }


  return (
    <>
      <FormLayout>
        <FormLayoutHeader>
          <BreadCrumb listItems={breadcrumbLink} />
        </FormLayoutHeader>
        <FormLayoutBody>
          <FormProvider {...methods}>
            <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <FormLayoutContent title="Add Language">
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="moduleId">Module</FormInputLabel>
                    <FormAutocomplete name='moduleId' id='moduleId' dataSource={listArrayModify(moduleList?.data?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="submoduleId">SubModule</FormInputLabel>
                    <FormAutocomplete name='submoduleId' id='submoduleId' dataSource={listArrayModify(subModuleList)} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="subchildmoduleId">SubChildModule</FormInputLabel>
                    <FormAutocomplete name='subchildmoduleId' id='subchildmoduleId' dataSource={listArrayModify(subChildModuleList)} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="field_type">Field Type</FormInputLabel>
                    <FormAutocomplete name='field_type' id='field_type' dataSource={listArrayModify(fieldTypes)} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="title">Title</FormInputLabel>
                    <FormInputBootstrap name='title' id="title" />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="field_trans_en">Field Trans EN</FormInputLabel>
                    <FormInputBootstrap name='field_trans_en' id="field_trans_en" />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="field_trans_bn">Field Trans BN</FormInputLabel>
                    <FormInputBootstrap name='field_trans_bn' id="field_trans_bn" />
                  </Grid>
                </Grid>
                <FormLayoutFooter>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="stuLeftBtn">
                      <Box className="clearBtn">
                        <Button type="button" onClick={() => methods.reset()} > ক্লিয়ার অল </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="stuRightBtn">
                      <Box className="addBtn">
                        <Button type="submit"> + যুক্ত করুন </Button>
                      </Box>
                    </Box>
                  </Grid>
                </FormLayoutFooter>
              </FormLayoutContent>
            </Box>
          </FormProvider>
        </FormLayoutBody>
        {alertDialogOpen === true && <AlertDialog
          open={alertDialogOpen}
          modeType="message"
          href="/admin/system-configuration/language"
          closeDialog={() => setAlertDialogOpen(false)}
          actionFunction={onActionNotification} />}
      </FormLayout>
    </>
  )
}

export default CreateLanguage