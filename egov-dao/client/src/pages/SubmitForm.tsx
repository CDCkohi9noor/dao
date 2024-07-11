import { useState } from "react";
import { Button } from "../components/ui/button";
import { useEthereum } from "../context/ContractProvider";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const SubmitForm = () => {
  const { createProposal, getAllProposals } = useEthereum();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageId, setImageId] = useState("");
  const [maxBids, setMaxBids] = useState("");

  getAllProposals();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createProposal(title, description, imageId, parseInt(maxBids));
  };

  return (
    <div className="h-screen gap-5 flex flex-col w-full">
      <h1 className="text-center text-2xl mx-auto">Submit Form</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image ID
          </label>
          <Input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Max Bids
          </label>
          <Input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={maxBids}
            onChange={(e) => setMaxBids(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SubmitForm;
