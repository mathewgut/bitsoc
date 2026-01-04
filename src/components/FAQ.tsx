import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <>
    <Accordion
      type="single"
      collapsible
      className="w-full pt-4 px-2 bg-black text-white"
      defaultValue="item-1"
    >
    <h2 className="flextext-white text-3xl font-semibold">FAQ</h2>
      <AccordionItem value="item-1" >
        <AccordionTrigger className="cursor-pointer">Where is BITSoc</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            The BITSoc club room is located in <a className="underline" href="https://maps.app.goo.gl/QMPpfaEH6xAeNTEs5" target="_blank"> room 140 of the Azrieli Pavilion at Carleton University</a>.
          </p>
          <p>
            You must be a current member of BITSoc to access the club room. <a className="underline" href="/membership" >Learn more about becoming a member</a>.
          </p>

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="cursor-pointer">How does BITSoc work</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            You can find information on BITSoc's history, mission statement, along with other related resources on our <a className="underline" href="/about" >About</a> page.
          </p>
          <p>
           The terms and rules for BITSoc, along with its executive team, are governed by the <a className="underline" href="https://docs.google.com/document/d/1Qe7lZjrh8y21Qbar5SdeRT76EHOnSNh77Epsg0YPpso/edit?tab=t.0" target="_blank">BITSoc Constitution</a>.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="cursor-pointer">Who can participate in events</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Most events are open to all Carleton University students, regardless of membership status. However, some exclusive events may be reserved for BIT and or BITSoc members only. Please check the event details for specific participation requirements.
          </p>
          <p>
            You can find information on upcoming events on our <a className="underline" href="/events" >Events</a> page or on our <a className="underline" href="https://discord.gg/vPTMaaM4fK" target="_blank">Discord</a> and <a className="underline" href="https://www.instagram.com/carletonbitsociety/" target="_blank">Instagram</a>.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </>
  )
}
