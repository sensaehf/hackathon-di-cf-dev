import { gql } from "@apollo/client";

export const UpdateBenefitsAndAllowances = gql`
mutation UpdatePerDiemsAndPerks($updatePerDiemAndPerkInput: UpdatePerDiemAndPerkInput!) {
    updatePerDiemAndPerk( updatePerDiemAndPerkInput: $updatePerDiemAndPerkInput) {
        id
        taxSubmissionId
        type
        amount
        currency
    }
}
`

export const CreatePerDiemWorkPayment = gql`
    mutation CreatePerDiemsAndPerks($createPerDiemAndPerkInput: CreatePerDiemAndPerkInput!) {
        createPerDiemAndPerk( createPerDiemAndPerkInput: $createPerDiemAndPerkInput) {        
        taxSubmissionId
        type
        amount
        currency
    }   
}
`
